"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { MANAGERS_BY_TEAM } from "@/content/managers";
import { useAuth } from "./AuthProvider";

type Mode = "login" | "signup";

export default function AccountMenu() {
  const { user, ready, login, signup, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!ready) return null;

  if (user) {
    return (
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <span data-testid="greeting">Hi, {user.manager}</span>
        <Button size="small" color="inherit" onClick={() => logout()}>
          Log out
        </Button>
      </Stack>
    );
  }

  const close = () => {
    setOpen(false);
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = mode === "login" ? await login(email, password) : await signup(email, password, manager);
    setBusy(false);
    if (err) setError(err);
    else close();
  };

  return (
    <>
      <Button size="small" color="inherit" onClick={() => setOpen(true)}>
        Log in
      </Button>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <form onSubmit={submit}>
          <DialogTitle>
            <Tabs
              value={mode}
              onChange={(_, v: Mode) => {
                setMode(v);
                setError(null);
              }}
              variant="fullWidth"
            >
              <Tab value="login" label="Log in" />
              <Tab value="signup" label="Sign up" />
            </Tabs>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              {mode === "signup" && (
                <TextField
                  select
                  label="Which manager are you?"
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  required
                  fullWidth
                >
                  {Object.values(MANAGERS_BY_TEAM).map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={busy}>
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
