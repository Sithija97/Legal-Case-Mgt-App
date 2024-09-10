type IProps = {
  title: string;
};

export const TablePageHeader = ({ title }: IProps) => {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-lg font-bold tracking-tight">{`Welcome back,`}</h2>
        <p className="text-muted-foreground">
          {/* Here&apos;s a list of your notes. */}
          {title}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {
          // user circle
        }
      </div>
    </div>
  );
};
