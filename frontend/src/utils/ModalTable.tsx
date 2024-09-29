"use client";

import { createContext, useContext, ReactNode, FC, CSSProperties } from "react";

interface TableContextProps {
  columns: string;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

interface TableProps {
  columns: string;
  children: ReactNode;
}

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-gray-200 text-base bg-gray-50 rounded-lg overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

interface CommonRowProps {
  $columns: string;
  children: ReactNode;
  role?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
}

const CommonRow: FC<CommonRowProps> = ({
  $columns,
  children,
  role,
  as: Component = "div",
  className = "",
  style = {},
}) => {
  return (
    <Component
      role={role}
      className={`grid items-center gap-x-6 transition-none ${className}`}
      style={{ gridTemplateColumns: $columns, ...style }}
    >
      {children}
    </Component>
  );
};

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a Table");
  }
  return (
    <CommonRow
      role="row"
      $columns={context.columns}
      as="header"
      className="m-6 py-6 px-6 bg-gray-50 border-b border-gray-100 uppercase font-semibold text-gray-600 text-center"
    >
      {children}
    </CommonRow>
  );
};

const Row: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table");
  }
  return (
    <CommonRow
      role="row"
      $columns={context.columns}
      className="py-5 px-6 text-center border-b border-gray-100 last:border-b-0"
    >
      {children}
    </CommonRow>
  );
};

const Empty: FC<{ message: string }> = ({ message }) => (
  <p className="text-lg font-medium text-center m-6">{message}</p>
);

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
  noArray?: string;
}

const Body = <T,>({ data, render, noArray = "empty data" }: BodyProps<T>) => {
  if (!data.length) return <Empty message={noArray} />;

  return <section className="m-6">{data.map(render)}</section>;
};

interface FooterProps {
  children: ReactNode;
  css?: CSSProperties;
}

const Footer: FC<FooterProps> = ({ children, css }) => {
  return (
    <footer className="bg-gray-50 flex justify-center p-5 m-6" style={css}>
      {children}
    </footer>
  );
};

interface OptionProps {
  children: ReactNode;
}

const Option: FC<OptionProps> = ({ children }) => {
  return <div>{children}</div>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Option = Option;

export default Table;
