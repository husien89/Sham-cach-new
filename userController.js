const updateBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { balance },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'فشل في تحديث الرصيد' });
  }
};

// أضف إلى exports
module.exports = {
  registerUser,
  loginUser,
  getUserData,
  updateBalance,
};
