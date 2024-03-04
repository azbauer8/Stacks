"use client"

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react"

export default function StackFormLoader() {
  return (
    <div className="space-y-5">
      <RadioGroup
        name="visibility"
        label="Visibility"
        defaultValue="public"
        orientation="horizontal"
        isDisabled
      >
        <Radio name="visibility" value="public">
          Public
        </Radio>
        <Radio name="visibility" value="private">
          Private
        </Radio>
      </RadioGroup>
      <Input isDisabled isRequired name="title" label="Title" />
      <Input isDisabled name="description" label="Description" />
      <Input isDisabled name="link" label="Link" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 ">
        <Autocomplete
          isDisabled
          name="useCase"
          label="Use Case"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="language"
          label="Language"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="framework"
          label="Framework"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="metaFramework"
          label="Meta Framework"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="styling"
          label="Styling"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="uiLibrary"
          label="UI Library"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="database"
          label="Database"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
        <Autocomplete
          isDisabled
          name="backendFramework"
          label="Backend Framework"
          variant="bordered"
          labelPlacement="inside"
        >
          <AutocompleteItem key="placeholder" textValue="placeholder" />
        </Autocomplete>
      </div>
      <Select
        isDisabled
        name="otherLibraries"
        label="Other Libraries"
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        classNames={{
          label: "overflow-visible",
        }}
      >
        <SelectItem key="placeholder" textValue="placeholder" />
      </Select>

      <div className="flex justify-end">
        <Button
          isDisabled
          className="w-full md:w-fit"
          variant="faded"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
