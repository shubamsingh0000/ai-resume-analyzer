export function fallbackAnalyze(text) {
  const lower=text.toLowerCase(); const words=text.trim().split(/\s+/).filter(Boolean);
  const sections=['experience','education','skills','projects','summary'];
  const present=sections.filter(s=>lower.includes(s));
  const keywordHits=['javascript','typescript','python','react','node','sql','aws','leadership','communication'].filter(k=>lower.includes(k));
  const bullets=(text.match(/[??*-]\s/g)||[]).length;
  const score=Math.min(100,Math.round(35+present.length*8+keywordHits.length*3+Math.min(15,bullets*2)+(words.length>300?10:0)));
  return {score,summary:`A ${score >= 75?'strong':'promising'} resume with ${words.length} words and clear opportunities to improve ATS alignment.`,strengths:[present.length?`Includes ${present.join(', ')} sections`:'Readable content structure',keywordHits.length?`Relevant skills detected: ${keywordHits.slice(0,5).join(', ')}`:'Add role-specific keywords','Use measurable outcomes in experience bullets'],improvements:[!present.includes('summary')?'Add a concise professional summary':'Tailor the summary to each target role',bullets<4?'Add more achievement-focused bullet points':'Lead bullets with strong action verbs','Mirror keywords from the job description'],keywords:keywordHits,sections:present,breakdown:{content:Math.min(100,55+present.length*7),formatting:bullets>2?86:68,keywords:Math.min(100,50+keywordHits.length*5),impact:Math.min(100,52+bullets*5)}};
}
