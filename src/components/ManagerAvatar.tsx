import Avatar from "@mui/material/Avatar";
import type { SxProps, Theme } from "@mui/material/styles";
import { teamImage } from "@/content/teamImages";

/** A manager's custom photo, or their initial when there isn't one. */
export default function ManagerAvatar({ name, size = 40, sx }: { name: string; size?: number; sx?: SxProps<Theme> }) {
  return (
    <Avatar
      src={teamImage(name) ?? undefined}
      alt={name}
      sx={[{ width: size, height: size, fontSize: size * 0.42, fontWeight: 700, bgcolor: "primary.main" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {name.charAt(0).toUpperCase()}
    </Avatar>
  );
}
