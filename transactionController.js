const { sendNotification } = require('../config/firebase');

// داخل دالة createTransaction
const createTransaction = async (req, res) => {
  try {
    // ... الكود السابق

    // إرسال إشعار للمستلم
    await sendNotification(
      receiver._id,
      `استلمت ${amount} ${currency} من ${sender.name}`,
      `وصف التحويل: ${description || 'لا يوجد وصف'}\nالرصيد الجديد: ${receiver.balance.get(currency)} ${currency}`
    );

    res.status(201).json({
      message: 'تم التحويل بنجاح',
      transaction: senderTransaction
    });
  } catch (error) {
    res.status(500).json({ message: 'فشل في إنشاء التحويل' });
  }
};
