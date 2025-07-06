import { Button } from "@/components/ui/button";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {  useUpdateBookMutation } from "@/redux/api/baseApi";
import type { iBook } from "@/types";
import { Edit2 } from "lucide-react";



import { useEffect, useState } from "react";

import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface update{
    book:iBook
}
interface errorMessage {
  data?:{
    message: string
  }
}

export function UpdateBook({book}:update) {
  const [open, setOpen] = useState(false);
const [updateBook] = useUpdateBookMutation()
  const form = useForm({
 
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            description: "",
            copies: 0,
          },
        
    
  });

  useEffect(() => {
    form.reset({
      title: book?.title,
      author: book?.author,
      genre: book?.genre,
      isbn: book?.isbn,
      description: book?.description,
      copies: book?.copies,
    });
  }, [book, form]);
 

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   
    try {
      await updateBook({id: book._id, ...data}).unwrap()
      toast.success("Book updated successfully")
  
      setOpen(false);
      
    } catch (error: unknown) {
      const err = error as errorMessage
      const errResponse = err?.data?.message
      toast.error(errResponse)


    }

 
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=' cursor-pointer hover:scale-50' variant={'outline'}><Edit2 className='text-yellow-500'/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update your book</DialogTitle>
          <DialogDescription>change the field</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Copies</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="w-[150px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mt-5 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="mt-5 cursor-pointer">
               Update Book
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
