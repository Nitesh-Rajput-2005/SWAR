import usermodel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOTP from "../utils/sendOTP.js";

const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });

    // =====================================================
    // USER ALREADY EXISTS
    // =====================================================

    if (existingUser) {

      // ---------------------------------------------
      // User is already verified
      // ---------------------------------------------

      if (existingUser.isVerified) {

        return res.status(409).json({
          message: "User already exists, you can login",
          success: false
        });

      }


      // ---------------------------------------------
      // User exists but is NOT verified
      // ---------------------------------------------

      // Generate new 6 digit OTP
      const otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Hash OTP
      const hashedOTP = await bcrypt.hash(otp, 10);

      // Update name
      existingUser.name = name;

      // Update password
      existingUser.password =
        await bcrypt.hash(password, 10);

      // Save new OTP
      existingUser.otpHash = hashedOTP;

      // OTP expires after 5 minutes
      existingUser.otpExpiresAt =
        new Date(Date.now() + 5 * 60 * 1000);

      // Reset OTP attempts
      existingUser.otpAttempts = 0;

      // Store time when OTP was sent
      existingUser.lastOTPSentAt = new Date();

      // Save updated user
      await existingUser.save();


      // Send new OTP
      try {

        await sendOTP(email, otp);

        return res.status(200).json({
          message: "New OTP sent to your email",
          success: true
        });

      } catch (emailError) {

        console.log("EMAIL ERROR:", emailError);

        return res.status(500).json({
          message: "Could not send OTP email",
          success: false
        });
      }
    }


    // =====================================================
    // NEW USER
    // =====================================================

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Hash OTP
    const hashedOTP =
      await bcrypt.hash(otp, 10);

    // OTP expires after 5 minutes
    const otpExpiresAt =
      new Date(Date.now() + 5 * 60 * 1000);


    // Create new user
    const newUser = new usermodel({

      name,

      email,

      password: hashedPassword,

      isVerified: false,

      otpHash: hashedOTP,

      otpExpiresAt,

      otpAttempts: 0,

      // IMPORTANT:
      // Store when OTP was sent
      lastOTPSentAt: new Date()
    });


    // Save user
    await newUser.save();


    // Send OTP email
    try {

      await sendOTP(email, otp);

    } catch (emailError) {

      console.log("EMAIL ERROR:", emailError);

      // If email fails, remove the user
      await usermodel.deleteOne({
        _id: newUser._id
      });

      return res.status(500).json({
        message: "Could not send OTP email",
        success: false
      });
    }


    // Signup successful
    res.status(201).json({
      message: "OTP sent to your email",
      success: true
    });


  } catch (err) {

    console.log("SIGNUP ERROR:", err);

    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Authentication failed, email or password is wrong",
        success: false
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        success: false
      });
    }

    const ispassequal = await bcrypt.compare(password, user.password);
    if (!ispassequal) {
      return res.status(403).json({
        message: "Authentication failed, email or password is wrong",
        success: false
      });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWTSECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwttoken,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    // Find user
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
        success: false
      });
    }

    // Check OTP exists
    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP not found. Please request a new OTP",
        success: false
      });
    }

    // Check OTP expiry
   if (new Date() > user.otpExpiresAt) {

    await usermodel.deleteOne({
        _id: user._id
    });

    return res.status(400).json({
        message: "OTP expired. Please sign up again.",
        success: false
    });
}

    // Compare entered OTP with hashed OTP
    const isOTPCorrect = await bcrypt.compare(
      otp,
      user.otpHash
    );

    if (!isOTPCorrect) {

  user.otpAttempts += 1;

  // Maximum 5 attempts
  if (user.otpAttempts >= 5) {

    user.otpHash = null;
    user.otpExpiresAt = null;

    await user.save();

    return res.status(429).json({
      message:
        "Too many incorrect attempts. Please request a new OTP.",
      success: false
    });
  }

  await user.save();

  return res.status(400).json({
    message:
      `Invalid OTP. ${5 - user.otpAttempts} attempts remaining.`,
    success: false
  });
}

    // OTP correct
    user.isVerified = true;

    // Clear OTP data
    user.otpHash = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
      success: true
    });

  } catch (err) {

    console.log("VERIFY OTP ERROR:", err);

    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const resendOTP = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up again.",
        success: false
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified. You can login.",
        success: false
      });
    }

    // Check resend cooldown
    if (user.lastOTPSentAt) {

      const timePassed =
        Date.now() - user.lastOTPSentAt.getTime();

      const cooldown = 60 * 1000;

      if (timePassed < cooldown) {

        const remainingSeconds =
          Math.ceil((cooldown - timePassed) / 1000);

        return res.status(429).json({
          message:
            `Please wait ${remainingSeconds} seconds before requesting another OTP`,
          success: false
        });
      }
    }

    // Generate new OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash OTP
    const hashedOTP =
      await bcrypt.hash(otp, 10);

    // Save new OTP
    user.otpHash = hashedOTP;

    user.otpExpiresAt =
      new Date(Date.now() + 5 * 60 * 1000);

    user.otpAttempts = 0;

    user.lastOTPSentAt = new Date();

    await user.save();

    // Send email
    await sendOTP(email, otp);

    res.status(200).json({
      message: "New OTP sent to your email",
      success: true
    });

  } catch (err) {

    console.log("RESEND OTP ERROR:", err);

    res.status(500).json({
      message: "Could not resend OTP",
      success: false
    });
  }
};

export { login, signup ,verifyOTP ,resendOTP};