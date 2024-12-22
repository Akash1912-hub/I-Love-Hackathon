import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendIcon } from "lucide-react";
import { useState } from "react";

interface TransactionSectionProps {
  onSendTransaction: (recipient: string, amount: string) => void;
  transactionStatus: string;
}

export function TransactionSection({ 
  onSendTransaction, 
  transactionStatus 
}: TransactionSectionProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Send Transaction</CardTitle>
        <SendIcon className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0xRecipientAddress"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              placeholder="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button 
            className="w-full"
            onClick={() => onSendTransaction(recipient, amount)}
          >
            Send Transaction
          </Button>

          {transactionStatus && (
            <p className="text-sm text-muted-foreground break-all">
              {transactionStatus}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}