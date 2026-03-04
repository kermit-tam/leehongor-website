/**
 * Leaderboard API - Server-side storage using in-memory Map
 * In production, this should use a database like Vercel KV, Redis, or MongoDB
 */

// In-memory storage (will reset on server restart)
// For production, replace this with a real database
const leaderboards = new Map<string, LeaderboardEntry[]>();

interface LeaderboardEntry {
  name: string;
  score: number;
  time?: string;
  difficulty?: string;
  date: string;
}

// GET /api/leaderboard?game=shouzhudaitu
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  
  if (!game) {
    return Response.json({ error: 'Game parameter required' }, { status: 400 });
  }
  
  const entries = leaderboards.get(game) || [];
  return Response.json({ entries });
}

// POST /api/leaderboard
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { game, name, score, time, difficulty } = body;
    
    if (!game || !name || score === undefined) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newEntry: LeaderboardEntry = {
      name: name.trim(),
      score,
      time,
      difficulty,
      date: new Date().toLocaleDateString('zh-HK')
    };
    
    const current = leaderboards.get(game) || [];
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    leaderboards.set(game, updated);
    
    return Response.json({ success: true, entries: updated });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/leaderboard?game=shouzhudaitu (optional - for clearing)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  
  if (!game) {
    return Response.json({ error: 'Game parameter required' }, { status: 400 });
  }
  
  leaderboards.delete(game);
  return Response.json({ success: true });
}
