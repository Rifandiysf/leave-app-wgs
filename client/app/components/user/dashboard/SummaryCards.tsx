
import { Card } from "@/app/components/ui/card"; 

type SummaryCardsProps = {
  currentAmount: number;
  carriedAmount: number;
};

export const SummaryCards = ({ currentAmount, carriedAmount }: SummaryCardsProps) => {
  const cards = [
    { count: currentAmount, label: "Remaining Leave", subtitle: "This Year" },
    { count: carriedAmount, label: "Remaining Leave", subtitle: "From Last Year" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
      {cards.map((item, idx) => (
        <Card key={idx} className="group hover:shadow-lg transition-all duration-300 bg-card border-0 overflow-hidden relative rounded-lg sm:rounded-2xl p-2 sm:p-3">
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 bg-blue-200 rounded-full -mr-6 -mt-6 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-full -ml-4 -mb-4 opacity-30"></div>
            <div className="relative p-1 sm:p-2">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <i className="bi bi-calendar-check text-white text-base sm:text-xl" />
                </div>
                <div className="text-right">
                  <div className="text-4xl sm:text-5xl md:text-9xl font-bold text-card-foreground mb-0.5 sm:mb-1">
                    {item.count}
                  </div>
                  <div className={`h-1 bg-blue-600 rounded-full ml-auto sm:hidden ${item.count >= 10 ? 'w-10' : 'w-6'}`}></div>
                  <div className={`h-1 bg-blue-600 rounded-full ml-auto hidden sm:block ${item.count >= 10 ? 'w-34' : 'w-24'}`}></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-card-foreground mb-0.5 sm:mb-1">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{item.subtitle}</p>
              </div>
            </div>
        </Card>
      ))}
    </div>
  );
};