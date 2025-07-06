import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import type { iBook } from "@/types";

import { format } from "date-fns";
import { BookOpen, CalendarIcon } from "lucide-react";
import { useState } from "react";

import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface borrowBokk {
  book: iBook;
}

interface errorMessage {
  data?: {
    message: string;
  };
}

export function AddBorrow({ book }: borrowBokk) {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const navigate = useNavigate();
  const [createBorrow, { data, isLoading, isError }] = useBorrowBookMutation();
  data?.data || null;
  const outofStock = book.copies === 0;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const addBorrowBook = {
      ...data,
      book,
    };
    try {
      await createBorrow(addBorrowBook).unwrap();
      toast.success("Book Borrowed Successfully");

      navigate("/borrow-summary");

      form.reset();
    } catch (error: unknown) {
      const err = error as errorMessage;
      const errormssgs = err?.data?.message || "Something went wrong";
      toast.error(errormssgs);
      setOpen(false);
    }
  };

  if(isLoading){
    return <p>Loading....</p>
  }

  if(isError){
    return <p>Erroor in addBook book</p>
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:scale-50" variant={"outline"}>
          <BookOpen className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Borrow Book</DialogTitle>
          <DialogDescription>Fill up the form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {outofStock ? (
              <p className="text-red-500 text-center font-semibold my-4">
                Not available for borrowing. No copies left.
              </p>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mt-2">Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mt-5 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="mt-5 cursor-pointer" disabled= {outofStock}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
