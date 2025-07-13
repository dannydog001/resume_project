import React, { useState } from "react";
import {
  ChevronDown, Target, Users, Brain, Globe, Zap, Search,
  MessageCircle, Heart, Star, TrendingUp, Sparkles, Award, CheckCircle
} from "lucide-react";

// --- DATA ---
const challenges = [
  {
    title: "Lack of Clarity in Career Goals",
    description:
      "Many candidates apply to jobs without a clear focus or direction, resulting in unaligned resumes, poor cover letters, and confused interviews.",
    tip: "Define your ideal role and career path before applying.",
    icon: Target,
    color: "linear-gradient(90deg, #a78bfa, #ec4899)",
    bgColor: "#f5f3ff",
    stats: "73% of job seekers"
  },
  {
    title: "Poorly Optimized Resume (Not ATS-Friendly)",
    description:
      "Applicant Tracking Systems (ATS) scan resumes before a human sees them. Generic resumes and complex formatting can lead to rejection.",
    tip: "Tailor your resume for each job using clear headings, bullet points, and job description keywords.",
    icon: Search,
    color: "linear-gradient(90deg, #3b82f6, #06b6d4)",
    bgColor: "#e0f2fe",
    stats: "75% filtered out by ATS"
  },
  {
    title: "Lack of Experience or Skills Mismatch",
    description:
      "Either too little experience or skills not aligned with the job. Freshers may lack practical exposure.",
    tip: "Build experience through internships, certifications, or project-based learning.",
    icon: TrendingUp,
    color: "linear-gradient(90deg, #22c55e, #10b981)",
    bgColor: "#ecfdf5",
    stats: "68% cite skill gaps"
  },
  {
    title: "Inadequate Online Presence",
    description:
      "Hiring managers often check your online footprint. Weak or missing LinkedIn profiles can hurt chances.",
    tip: "Create a strong LinkedIn and showcase work on GitHub, Behance, or a personal website.",
    icon: Globe,
    color: "linear-gradient(90deg, #fb923c, #ef4444)",
    bgColor: "#fff7ed",
    stats: "92% of recruiters use social media"
  },
  {
    title: "Poor Interview Skills",
    description:
      "Candidates often struggle to present themselves clearly, lacking confidence or structure in their responses.",
    tip: "Practice using the STAR method and research the company thoroughly.",
    icon: MessageCircle,
    color: "linear-gradient(90deg, #6366f1, #a78bfa)",
    bgColor: "#eef2ff",
    stats: "60% fail due to poor communication"
  },
  {
    title: "Applying Without Networking",
    description:
      "Solely relying on job portals means missing out on hidden opportunities and valuable referrals.",
    tip: "Attend industry events and reach out on LinkedIn for informational interviews.",
    icon: Users,
    color: "linear-gradient(90deg, #ec4899, #f43f5e)",
    bgColor: "#fdf2f8",
    stats: "85% of jobs filled through networking"
  },
  {
    title: "Lack of Feedback and Follow-Up",
    description:
      "Not receiving feedback prevents learning. Ignoring follow-up reduces your chances.",
    tip: "Politely ask for feedback and send thank-you emails to stand out.",
    icon: Heart,
    color: "linear-gradient(90deg, #14b8a6, #06b6d4)",
    bgColor: "#f0fdfa",
    stats: "Only 4% follow up effectively"
  },
  {
    title: "Mental Fatigue and Demotivation",
    description:
      "Constant rejection affects confidence and can lead to burnout and reduced application quality.",
    tip: "Take breaks, stay positive, and seek support from mentors or job groups.",
    icon: Brain,
    color: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
    bgColor: "#f5f3ff",
    stats: "78% experience job search burnout"
  },
  {
    title: "Overqualification or Underqualification",
    description:
      "Overqualified candidates may be seen as flight risks, while underqualified ones may not meet requirements.",
    tip: "Target roles that align with your level and tailor your story to match company needs.",
    icon: Star,
    color: "linear-gradient(90deg, #f59e42, #fb923c)",
    bgColor: "#fffbeb",
    stats: "42% struggle with qualification match"
  },
  {
    title: "Geographic or Industry Constraints",
    description:
      "Limiting yourself by location or industry can reduce opportunities and increase competition.",
    tip: "Be open to relocation or upskill for high-demand sectors.",
    icon: Zap,
    color: "linear-gradient(90deg, #10b981, #14b8a6)",
    bgColor: "#ecfdf5",
    stats: "56% limit location flexibility"
  }
];

export default function JobSearchChallengesPage() {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff 0%, #c7d2fe 100%)",
      padding: "0 0 90px 0",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "56px 16px 30px 16px",
        background: "linear-gradient(90deg, #7c3aed 10%, #06b6d4 80%)",
        color: "#fff"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 12
        }}>
          <span style={{
            background: "linear-gradient(135deg, #a78bfa, #ec4899)",
            borderRadius: "50%", padding: 15, boxShadow: "0 4px 18px #7e22ce33"
          }}>
            <Target style={{ width: 40, height: 40, color: "#fff" }} />
          </span>
          <Sparkles style={{ width: 22, height: 22, color: "#fde047" }} />
        </div>
        <h1 style={{
          fontWeight: 800,
          fontSize: "2.5rem",
          margin: "0 0 10px 0",
          background: "linear-gradient(90deg, #a78bfa, #ec4899, #38bdf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>Job Search Challenges</h1>
        <p style={{
          fontSize: "1.12em",
          color: "#e0e7ef",
          maxWidth: 480, margin: "0 auto 16px", lineHeight: 1.6
        }}>
          Master the modern job market with clear, data-driven insights.
        </p>
        <div style={{
          display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap"
        }}>
          <span style={{
            background: "rgba(255,255,255,0.10)",
            borderRadius: 15, padding: "7px 18px", fontWeight: 600, fontSize: "1em"
          }}>
            <Award style={{ width: 16, height: 16, marginRight: 8, verticalAlign: "middle" }} />
            10 Critical Challenges
          </span>
          <span style={{
            background: "rgba(255,255,255,0.10)",
            borderRadius: 15, padding: "7px 18px", fontWeight: 600, fontSize: "1em"
          }}>
            <CheckCircle style={{ width: 16, height: 16, marginRight: 8, verticalAlign: "middle" }} />
            Practical Solutions
          </span>
        </div>
      </div>

      {/* Challenges */}
      <div style={{
        maxWidth: 730, margin: "0 auto", padding: "36px 10px 0 10px",
        display: "grid", gap: 24
      }}>
        {challenges.map((c, i) => {
          const Icon = c.icon;
          const isOpen = expandedCard === i;
          return (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 18px #6366f15e",
                padding: 0,
                border: "1px solid #e0e7ef",
                overflow: "hidden",
                transition: "box-shadow 0.2s, transform 0.17s",
                ...(isOpen ? { boxShadow: "0 8px 32px #a78bfa69", transform: "scale(1.02)" } : {})
              }}
            >
              <button
                aria-expanded={isOpen}
                aria-controls={`challenge-details-${i}`}
                onClick={() => setExpandedCard(isOpen ? null : i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: "0",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{
                  flexShrink: 0,
                  margin: "20px 18px 20px 20px",
                  position: "relative"
                }}>
                  <span style={{
                    display: "block",
                    borderRadius: 18,
                    background: c.color,
                    width: 54, height: 54,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 18px #7c3aed22"
                  }}>
                    <Icon style={{ width: 32, height: 32, color: "#fff" }} />
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0, padding: "0 8px" }}>
                  <div style={{
                    fontWeight: 700, fontSize: "1.12em", color: "#1e293b", marginBottom: 4
                  }}>
                    {i + 1}. {c.title}
                  </div>
                  <div style={{
                    display: "inline-block",
                    background: c.color,
                    color: "#fff",
                    borderRadius: 13,
                    padding: "3px 14px",
                    fontSize: ".97em",
                    fontWeight: 600,
                    marginBottom: 2
                  }}>
                    {c.stats}
                  </div>
                </div>
                <ChevronDown
                  style={{
                    width: 24, height: 24, color: "#6366f1",
                    margin: "0 20px 0 0",
                    transition: "transform 0.3s",
                    transform: isOpen ? "rotate(180deg)" : undefined
                  }}
                />
              </button>
              <div
                id={`challenge-details-${i}`}
                style={{
                  maxHeight: isOpen ? 500 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.33s cubic-bezier(.31,.9,.55,1), opacity 0.3s",
                  background: c.bgColor,
                  borderTop: isOpen ? "1px solid #e0e7ef" : "none",
                  padding: isOpen ? "18px 30px 24px 80px" : "0 30px",
                  color: "#334155"
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>The Challenge</div>
                <div style={{ marginBottom: 12, color: "#475569" }}>{c.description}</div>
                <div style={{ fontWeight: 600, marginBottom: 2, color: "#0ea5e9" }}>
                  <Zap style={{
                    width: 18, height: 18, verticalAlign: "middle",
                    marginRight: 6, color: "#fde047"
                  }} />
                  Pro Solution
                </div>
                <div style={{ color: "#15803d", fontWeight: 500 }}>{c.tip}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner */}
      <div style={{
        margin: "70px auto 0 auto", textAlign: "center", maxWidth: 650, padding: "0 12px"
      }}>
        <div style={{
          background: "linear-gradient(90deg, #a78bfa, #ec4899, #38bdf8)",
          borderRadius: 24,
          padding: "40px 15px",
          color: "#fff",
          boxShadow: "0 6px 38px #a78bfa36",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 18
          }}>
            <span style={{
              background: "#fde047", borderRadius: "50%",
              width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Heart style={{ width: 32, height: 32, color: "#fff" }} />
            </span>
          </div>
          <h2 style={{
            fontWeight: 800, fontSize: "1.65rem", margin: 0,
            lineHeight: 1.17
          }}>
            Your Success Story<br />
            <span style={{
              background: "linear-gradient(90deg, #fde047, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Starts Today</span>
          </h2>
          <div style={{
            color: "#fff", margin: "18px auto 24px", maxWidth: 420, fontSize: "1.08em"
          }}>
            Every challenge is a stepping stone to your dream career. Armed with these insights, you're ready to conquer the job market with confidence and strategy.
          </div>
          <div style={{
            display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap"
          }}>
            {[
              { icon: "💪", text: "Stay Resilient" },
              { icon: "🎯", text: "Stay Focused" },
              { icon: "🚀", text: "Keep Evolving" }
            ].map((item, idx) => (
              <span key={idx} style={{
                background: "rgba(255,255,255,0.21)",
                borderRadius: 18, padding: "11px 22px",
                fontWeight: 700, fontSize: "1em", color: "#fff",
                display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{ fontSize: "1.3em", marginRight: 4 }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}