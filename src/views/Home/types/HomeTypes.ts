interface ITags {
  id: string;
  name: string;
}
interface ITasks {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  tags: ITags[];
}

export { ITasks, ITags };
