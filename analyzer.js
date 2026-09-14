import { fallbackAnalyze } from './fallbackAnalyzer.js';
export async function analyzeResume(text) {
  if (!process.env.OPENAI_API_KEY) return {...fallbackAnalyze(text), provider:'fallback'};
  try { const base=process.env.OPENAI_BASE_URL||'https://api.openai.com/v1'; const r=await fetch(`${base}/chat/completions`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',temperature:.2,response_format:{type:'json_object'},messages:[{role:'system',content:'Analyze resumes. Return JSON with score,summary,strengths,improvements,keywords,sections,breakdown.'},{role:'user',content:text.slice(0,18000)}]})}); if(!r.ok) throw Error('AI request failed'); const data=await r.json(); return {...JSON.parse(data.choices[0].message.content),provider:'openai'}; } catch { return {...fallbackAnalyze(text),provider:'fallback'}; }
}
