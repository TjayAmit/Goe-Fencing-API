const express = require('express');
const fs = require('fs');
const turf = require('@turf/turf');
const haversine = require('../utils/haversine');

const router = express.Router();
const dataPath = './data/fences.json';

function readFences() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeFences(fences) {
  fs.writeFileSync(dataPath, JSON.stringify(fences, null, 2));
}

// GET all fences
router.get('/', (req, res) => {
  const fences = readFences();
  res.json(fences);
});

// Add new fence
router.post('/', (req, res) => {
  const fences = readFences();
  const newFence = { id: Date.now(), ...req.body };
  fences.push(newFence);
  writeFences(fences);
  res.status(201).json(newFence);
});

// Update fence
router.put('/:id', (req, res) => {
  const fences = readFences();
  const id = Number(req.params.id);
  const index = fences.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ message: 'Fence not found' });

  fences[index] = { ...fences[index], ...req.body };
  writeFences(fences);
  res.json(fences[index]);
});

// Delete fence
router.delete('/:id', (req, res) => {
  const fences = readFences();
  const id = Number(req.params.id);
  const newFences = fences.filter(f => f.id !== id);
  writeFences(newFences);
  res.json({ message: 'Deleted successfully' });
});

// Check if a point is inside any fence
router.post('/check', (req, res) => {
  const { lat, lng, location } = req.body;
  const fences = readFences();

  let insideFence = null;

  const fence = fences.find(f => f.location === location);

  let inside = false;

  if (fence.type === 'circle') {
    const distance = haversine(lat, lng, fence.center[0], fence.center[1]);
    inside = distance <= fence.radius;
  }

  if (fence.type === 'polygon') {
    const point = turf.point([lng, lat]);
    const polygon = turf.polygon([fence.coordinates]);
    inside = turf.booleanPointInPolygon(point, polygon);
  }

  res.json({
    inside: !!inside,
    fence: inside ? fence.name : null,
  });
});

module.exports = router;
