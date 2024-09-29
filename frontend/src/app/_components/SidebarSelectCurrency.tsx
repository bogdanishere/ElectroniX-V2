import styles from "@/app/TestButton.module.css";

export default function SidebarSelectCurrency({
  children,
  currency,
  handleCurrencyChange,
  onClick,
}: {
  children: React.ReactNode;
  currency: string;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: () => void;
}) {
  return (
    <div className={styles.sidebarIcon} onClick={onClick}>
      <button>{children}</button>
      <div className={styles.sidebarTooltip}>
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="w-40 p-2 border border-gray-300 rounded-md text-gray-700 
          bg-white shadow-sm focus:outline-none focus:ring-2 
          focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="RON">RON</option>
        </select>
      </div>
    </div>
  );
}
