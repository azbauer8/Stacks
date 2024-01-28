"use client"

import { UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

import { FormData } from "../page"

export default function BasicInfo({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="visibility"
        render={({ field }) => (
          <FormItem className="space-y-3">
            {/* <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="public" />
                  </FormControl>
                  <FormLabel className="font-normal">Public</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="private" />
                  </FormControl>
                  <FormLabel className="font-normal">Private</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl> */}
            <FormLabel>Visibility</FormLabel>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  id="visibility"
                  checked={field.value === "public"}
                  onCheckedChange={(checked) => {
                    form.setValue("visibility", checked ? "public" : "private")
                  }}
                />
              </FormControl>
              <Label htmlFor="visibility">
                {form.getValues("visibility") === "public"
                  ? "Public"
                  : "Private"}
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter a title"
                {...field}
                className="w-full flex-1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Enter a description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input placeholder="Include a link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
