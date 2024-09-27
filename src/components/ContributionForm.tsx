"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import web3 from "@/../ethereum/web3";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Campaign from "../../ethereum/campaign";

const formSchema = z.object({
  value: z.coerce.string(),
});

type ContributionFormProps = {
  address: string;
};

export default function ContributionForm({ address }: ContributionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        throw new Error(
          "No Ethereum accounts found. Please ensure MetaMask is connected."
        );
      }

      const campaign = Campaign(address);

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(values.value, "ether"),
      });

      toast({
        title: "Contributed successfully!",
        description: "You have been contributed successfully.",
      });
      router.replace(`/campaigns/${address}`);
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Amount for Contribution</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    className="border-zinc-50"
                    placeholder="Enter amount"
                    {...field}
                    type="number"
                  />
                  <div className="text-sm h-9 pt-2">ether</div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 rounded-xl border-zinc-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Contributing..." : "Contribute"}
        </Button>
      </form>
    </Form>
  );
}
