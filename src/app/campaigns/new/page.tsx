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
import factory from "@/../ethereum/factory";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

const formSchema = z.object({
  minimumContribution: z.coerce.number(),
});

export default function Page() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minimumContribution: 0,
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

      const gasEstimate = await factory.methods
        .createCampaign(values.minimumContribution)
        .estimateGas({
          from: accounts[0],
        });

      await factory.methods.createCampaign(values.minimumContribution).send({
        from: accounts[0],
        gas: gasEstimate,
      });

      toast({
        title: "Campaign created successfully!",
        description: "Your campaign has been created successfully.",
      });
      route.push("/");
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
    <div>
      <BackButton />
      <div className="bg-zinc-800 mt-8 p-8 max-w-xl rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="minimumContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Minimum Contribution
                  </FormLabel>
                  <FormControl>
                    <div className="flex item-center gap-4">
                      <Input
                        className="border-zinc-50"
                        placeholder="Enter the minimum amount"
                        {...field}
                        type="number"
                        min={0}
                      />
                      <div className="text-sm h-9 pt-2">Wei</div>
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
