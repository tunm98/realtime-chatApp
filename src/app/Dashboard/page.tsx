import { FC, useState } from "react";
import Button from "../../components/ui/Button";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return <Button isLoading={isLoading}>Submit</Button>;
};

export default Page;
