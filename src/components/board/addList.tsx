import { useCreateList } from "@/hooks/useList";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { createListSchema } from "../../validations/listValidation";
import { useListSocket } from "@/hooks/useListSocket";
import { useBoardSocket } from "@/context/boardSocketProvider";

export default function AddList({ boardId }: { boardId: string }) {
  const [isShowInput, setIsShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const { mutate, isSuccess } = useCreateList({ boardId });

  useEffect(() => {
    if (isShowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isShowInput, handleSubmit]);

  const handleAddList = () => {
    setIsShowInput(true);
  };

  const form = useForm({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: "",
    },
  });

  const { socket } = useBoardSocket();

  const { onCreateList } = useListSocket({ socket, form });

  function handleSubmit(values: z.infer<typeof createListSchema>) {
    onCreateList({ data: values, boardId });
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
    <div className="w-72 p-3 h-min space-y-2">
      {isShowInput ? (
        <div className="p-2 bg-primary/30 flex flex-col gap-3 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-full bg-secondary border-none focus-visible:ring-primary transition-all duration-300 focus-visible:ring-1 focus-visible:ring-offset-0"
                        placeholder="Enter list name"
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
                  <Check className="w-4 h-4" /> Add List
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
          className="p-3 bg-primary/30 flex justify-start items-center rounded-md cursor-pointer text-muted-foreground"
          onClick={handleAddList}
        >
          <h1 className="text-sm font-bold flex justify-center items-center gap-2 ">
            <Plus className="w-5 h-5" /> Add New List
          </h1>
        </div>
      )}
    </div>
  );
}
