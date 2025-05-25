import Router from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Login endpoint');
});

// Login endpoint
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password (in a real app, you'd want to hash this)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
    
    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
