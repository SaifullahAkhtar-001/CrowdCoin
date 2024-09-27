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
  description: z.coerce.string(),
  value: z.coerce.string(),
  recipient: z.coerce.string(),
});

type ContributionFormProps = {
  address: string;
};

export default function RequestForm({ address }: ContributionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      description: "",
      recipient: "",
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

      await campaign.methods.createRequest(
        values.description,
        web3.utils.toWei(values.value, "ether"),
        values.recipient
      ).send({
        from: accounts[0],
      });

      toast({
        title: "Contributed successfully!",
        description: "You have been contributed successfully.",
      });
      router.push(`/campaigns/${address}/requests`);
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                  <Input
                    className="border-zinc-50"
                    placeholder="Enter description"
                    {...field}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Amount in ether</FormLabel>
              <FormControl>
                  <Input
                    className="border-zinc-50"
                    placeholder="Enter amount"
                    {...field}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Recipient</FormLabel>
              <FormControl>
                  <Input
                    className="border-zinc-50"
                    placeholder="Enter recipient address"
                    {...field}
                  />
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
          {isSubmitting ? "Creating request..." : "Create Request"}
        </Button>
      </form>
    </Form>
  );
}
