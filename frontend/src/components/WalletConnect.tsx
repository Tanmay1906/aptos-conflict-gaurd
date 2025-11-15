import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, Unlink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WalletConnect = () => {
  const { user, connectWallet, disconnectWallet } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setIsConnecting(true);
    setError("");

    try {
      await connectWallet();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (user?.walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          Wallet: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
        </div>
        <Button variant="outline" size="sm" onClick={handleDisconnect}>
          <Unlink className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? "Connecting..." : "Connect Petra Wallet"}
      </Button>
    </div>
  );
};
