export default function handler(req, res) {
  const { v, type, title } = req.query;

  if (!v) {
    res.status(400).json({ error: 'Missing video URL parameter ?v=' });
    return;
  }

  const is180 = type === 'sbs' || type === '180';

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.json({
    title: decodeURIComponent(title || 'VR KINGS'),
    is3d: true,
    screenType: is180 ? 'dome' : 'sphere',
    stereoMode: is180 ? 'sbs' : 'mono',
    skipIntro: 0,
    videoLength: 0,
    encodings: [{
      name: 'h264',
      videoSources: [{ resolution: 3840, url: decodeURIComponent(v) }]
    }]
  });
}
