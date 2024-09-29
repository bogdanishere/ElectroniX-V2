import styles from "@/app/TestButton.module.css";

export default function SidebarButton({
  content,
  onClick,
  children,
}: {
  content: string | React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.sidebarIcon} onClick={onClick}>
      <button>{children}</button>
      <div className={styles.sidebarTooltip}>{content}</div>
    </div>
  );
}
