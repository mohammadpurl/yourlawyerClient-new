import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcont } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props: SvgIcont) {
  return (
    <BaseIcon {...props}>
      <path d="M21 16.5L11.989 7.5L3 16.5" />
    </BaseIcon>
  );
}
