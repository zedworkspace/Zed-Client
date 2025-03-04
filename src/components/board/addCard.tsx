import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Plus, X } from "lucide-react";
import { createCardSchema } from "@/validations/cardValidation";
import { useCreateCard } from "@/hooks/useCard";

type Props = {
  listId: string;
  boardId: string;
};

export default function AddCard({ listId, boardId }: Props) {
  const [isShowInput, setIsShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isShowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isShowInput, handleSubmit]);

  const form = useForm({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate, isSuccess } = useCreateCard({ boardId });

  function handleSubmit(values: z.infer<typeof createCardSchema>) {
    mutate({ data: values, listId });
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess]);

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (
        activeElement !== submitRef.current &&
        activeElement?.tagName !== "BUTTON"
      ) {
        setIsShowInput(false);
      }
    }, 0);
  };

  return (
    <>
      {isShowInput ? (
        <div className="p-3 bg-primary/30 transition-colors duration-300  rounded-md flex flex-col justify-evenly gap-3 cursor-pointer text-muted-foreground hover:text-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full bg-secondary border-none focus-visible:ring-primary transition-all duration-300 focus-visible:ring-1 focus-visible:ring-offset-0"
                        placeholder="Enter title"
                        {...field}
                        autoComplete="off"
                        ref={inputRef}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between w-full gap-2 mt-3">
                <Button
                  className="flex-1 text-muted-foreground flex items-center gap-2"
                  type="submit"
                  disabled={!form.formState.isValid}
                  ref={submitRef}
                >
                  <Check className="w-4 h-4" /> Add Card
                </Button>
                <Button
                  className="w-10 h-10 bg-transparent hover:bg-secondary flex items-center justify-center p-2"
                  onClick={() => setIsShowInput(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div
          className="p-3 hover:bg-primary/10 hidden group-hover:flex transition-colors duration-300  rounded-md  flex-col justify-evenly gap-3 cursor-pointer text-muted-foreground hover:text-white"
          onClick={() => setIsShowInput(true)}
        >
          <h1 className="text-sm font-bold flex justify-center items-center gap-2 ">
            <Plus className="w-5 h-5" /> Add New Card
          </h1>
        </div>
      )}
    </>
  );
}
