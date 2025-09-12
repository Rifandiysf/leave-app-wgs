import { Card } from "@/app/components/ui/card";

type SummaryCardsProps = {
  currentAmount: number;
  carriedAmount: number;
  last_two_year_amount: number;
};

export const SummaryCards = ({ currentAmount, carriedAmount, last_two_year_amount }: SummaryCardsProps) => {
  const today = new Date();
  const aprilFirst = new Date(today.getFullYear(), 3, 1, 0, 0, 0);
  const isExpired = today >= aprilFirst;

  const cards = [
    {
      count: currentAmount,
      label: "Remaining Leave",
      subtitle: "This Year",
      variant: "default"
    },
    {
      count: carriedAmount,
      label: "Remaining Leave",
      subtitle: "From Last Year",
      variant: "default"
    },
    {
      count: last_two_year_amount,
      label: "Remaining Leave",
      subtitle: isExpired ? "2 Years Ago Has Expired" : "2 Years Ago",
      variant: isExpired ? "expired" : "default"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
      {cards.map((item, idx) => (
        <Card
          key={idx}
          className={`group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-2 sm:p-3 
            ${item.variant === "expired" ? "bg-red-100 dark:bg-red-100" : "bg-card"}`}
        >
          <div className={`absolute top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 
              ${item.variant === "expired" ? "bg-red-300" : "bg-blue-200"} 
              rounded-full -mr-6 -mt-6 opacity-50`}
          ></div>
          <div className={`absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 
              ${item.variant === "expired" ? "bg-red-400" : "bg-blue-300"} 
              rounded-full -ml-4 -mb-4 opacity-30`}
          ></div>

          <div className="relative p-1 sm:p-2">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 
                  ${item.variant === "expired" ? "bg-red-500" : "bg-secondary"} 
                  rounded-xl flex items-center justify-center`}>
                <i className={`bi bi-${item.variant === "expired" ? "x-circle" : "calendar-check"} text-white text-base sm:text-xl`} />
              </div>
              <div className="text-right">
                <div className={`text-4xl sm:text-5xl md:text-9xl font-bold mb-0.5 sm:mb-1
                  ${item.variant === "expired" ? "text-red-600" : "text-card-foreground"}`}>
                  {item.count}
                </div>
              </div>
            </div>
            <div>
              <h3 className={`text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1
                ${item.variant === "expired" ? "text-red-600" : "text-card-foreground"}`}>
                {item.label}
              </h3>
              <p className={`text-xs sm:text-sm 
                ${item.variant === "expired" ? "text-red-500" : "text-muted-foreground"}`}>
                {item.subtitle}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
