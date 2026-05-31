const Announcement = require('../models/Announcement');

exports.getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne().sort({ createdAt: -1 });
    res.json(announcement || { text: 'Welcome to Ayurveda', link: '', active: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { text, link, active } = req.body;
    let announcement = await Announcement.findOne().sort({ createdAt: -1 });
    
    if (announcement) {
      announcement.text = text;
      announcement.link = link || '';
      if (active !== undefined) announcement.active = active;
      await announcement.save();
    } else {
      announcement = new Announcement({ text, link, active });
      await announcement.save();
    }
    
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
