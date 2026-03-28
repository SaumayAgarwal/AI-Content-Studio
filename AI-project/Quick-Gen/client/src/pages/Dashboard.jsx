import React, { useState, useEffect } from "react";
import { Sparkles, Gem, TrendingUp } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/ai/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const plan = user?.publicMetadata?.plan === "Professional" ? "Premium" : (user?.publicMetadata?.plan ?? "Free");

  const statCards = [
    {
      label: "Total Creations",
      value: creations.length,
      Icon: Sparkles,
      iconBg: "linear-gradient(135deg, #C9973A, #A07420)",
    },
    {
      label: "Active Plan",
      value: plan,
      Icon: Gem,
      iconBg: "linear-gradient(135deg, #E8B65A, #C9973A)",
      capitalize: true,
    },
    {
      label: "This Month",
      value: creations.filter((c) => {
        const d = new Date(c.created_at);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
      Icon: TrendingUp,
      iconBg: "linear-gradient(135deg, #5DCAA5, #0F6E56)",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 text-white font-sans">

      {/* Welcome */}
      <div className="mb-7">
        <h1 className="font-display text-2xl font-bold text-white">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋
        </h1>
        <p className="text-slate text-sm mt-1">Here's what's happening with your content today.</p>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 flex-wrap mb-8">
        {statCards.map(({ label, value, Icon, iconBg, capitalize }) => (
          <div
            key={label}
            className="flex justify-between items-center w-64 p-5 px-6 rounded-2xl transition-all duration-300
              hover:shadow-[0_4px_25px_rgba(201,151,58,0.15)]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p className="text-sm font-medium text-slate">{label}</p>
              <h2
                className={`text-3xl font-bold mt-1 text-white font-display ${capitalize ? "capitalize" : ""}`}
              >
                {value}
              </h2>
            </div>
            <div
              className="w-10 h-10 rounded-xl text-white flex justify-center items-center shrink-0"
              style={{ background: iconBg }}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Creations */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div
            className="w-11 h-11 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#C9973A", borderTopColor: "transparent" }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-5">
            <p className="font-display font-semibold text-lg text-white tracking-wide">Recent Creations</p>
            <span
              className="px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold"
              style={{ background: "rgba(201,151,58,0.15)", color: "#E8B65A" }}
            >
              {creations.length}
            </span>
          </div>

          {creations.length === 0 ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-white font-semibold mb-1">No creations yet</p>
              <p className="text-slate text-sm">Start by picking a tool from the sidebar.</p>
            </div>
          ) : (
            creations.map((item) => <CreationItem key={item.id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
