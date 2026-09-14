# Architecture
React/Vite client talks to an Express API. MongoDB persistence is optional; the server uses an in-memory repository when unavailable. Resume extraction supports PDF via pdf-parse and DOCX via mammoth. Analysis is provided by an OpenAI-compatible provider when configured, otherwise a transparent fallback scores content using ATS heuristics.
