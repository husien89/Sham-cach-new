// البحث عن مستخدم بواسطة البريد الإلكتروني
router.get('/search', authMiddleware, userController.searchUserByEmail);
