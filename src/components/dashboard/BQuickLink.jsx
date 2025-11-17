import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";

const quickActions = [
  {
    id: "transactions",
    label: "Transactions",
    icon: "/Transaction.svg",
    border: "border-[#3BA776]",
    bg: "bg-[#EBF9F1]",
    text: "text-[#146C43]",
  },
  {
    id: "services",
    label: "Services",
    icon: "/services.svg",
    border: "border-[#5D63E5]",
    bg: "bg-[#EEF0FF]",
    text: "text-[#3236AE]",
  },
  {
    id: "promotions",
    label: "Promotions",
    icon: "/promotion.svg",
    border: "border-[#A25EC2]",
    bg: "bg-[#F6EBFF]",
    text: "text-[#6D2D84]",
  },
];

const BQuickLink = () => {
  const { user } = useAuth();
  const displayName = useMemo(() => {
    if (!user) {
      return "there";
    }
    return user.name || user.username || "there";
  }, [user]);

  const walletBalance = useMemo(() => {
    if (user?.wallet_balance) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(Number(user.wallet_balance));
    }
    return "₦100,000";
  }, [user]);

  return (
    <section className="grid gap-6 text-[#2F1B00] lg:grid-cols-[3fr,2fr]">
      <div className="rounded-2xl border border-[#F2CFA1] bg-[#FFF7EC] p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-[#E4C89C] bg-white object-cover">
                <img
                  src={user?.profilePicture || "/profilepicture.png"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-[#C47A1D]">Good Morning!</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold capitalize">{displayName}</h2>
                  <img src="/verified.svg" alt="Verified" className="h-4 w-4" />
                </div>
                <p className="text-xs text-[#93613A]">Let&apos;s grow your salon today</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-[#E7C68E] bg-white px-4 py-2 text-xs font-medium text-[#93613A] shadow">
                My Wallet
              </button>
              <button className="rounded-full border border-[#E7C68E] bg-white px-4 py-2 text-xs font-medium text-[#93613A] shadow">
                Manage Team
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr,3fr]">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E7C68E] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-sm text-[#93613A]">
                <span>Total Balance</span>
                <span role="img" aria-label="eye">
                  👁️
                </span>
              </div>
              <p className="text-3xl font-bold text-[#2F1B00]">{walletBalance}</p>
              <p className="text-xs text-[#A87440]">My Wallet</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className={`flex flex-col items-start justify-between overflow-hidden rounded-2xl border ${action.border} ${action.bg} p-4 text-left shadow-sm transition hover:shadow-md`}
                >
                  <img src={action.icon} alt={action.label} className="h-8 w-8" />
                  <span className={`text-sm font-semibold ${action.text}`}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#F2CFA1] bg-[#FFECD2] p-6 text-[#2F1B00] shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#C17A1E]">
          Intro hook
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-snug">10x your income</h3>
        <p className="mt-2 max-w-xs text-sm text-[#8C5A1E]">
          Selling your skills on Flaury unlocks more bookings, more loyal clients, and more revenue for your business.
        </p>
        <button className="mt-4 inline-flex items-center rounded-full bg-[#2F1B00] px-5 py-2 text-xs font-semibold text-[#FFECD2] transition hover:bg-[#492C07]">
          Explore tips
        </button>
        <img
          src="/money.svg"
          alt="Earnings"
          className="pointer-events-none absolute -bottom-2 right-4 h-28 w-28 opacity-90"
        />
      </div>
    </section>
  );
};

export default BQuickLink;
