type p2pResponse = {
  protocol: string;
  command: string;
  data: string;
  from: string;
  to: string;
  count: number;
};

type tableData = Array<p2pResponse>;

export type TableView = {
  spinner: boolean;
  host: string;
  data: tableData;
};
