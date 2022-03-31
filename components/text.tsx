import "@/styles/components/text";

import { StyleFonts } from "@/config/fonts";

type Prop = {
  size?: number | string;
  fontVariant?: StyleFonts | string;
  nowrap?: boolean;
  upperCase?: boolean;
  css?: string;
  pointer?: boolean;
};

export const Text: React.FC<Prop> = ({
  size,
  fontVariant,
  children
}) => {
  return (
    <div className="text">
      {children}
    </div>
  );
};
