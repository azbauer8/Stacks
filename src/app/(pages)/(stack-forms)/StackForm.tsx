"use client"

import { FormattedStack } from "@/supabase/helpers"
import { FormFieldOptions } from "@/supabase/queries"
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { useFormStatus } from "react-dom"

export default function StackForm({
  fieldOptions,
  initialData,
  submitAction,
}: {
  fieldOptions: FormFieldOptions
  initialData?: FormattedStack
  submitAction: (formData: FormData) => Promise<void>
}) {
  return (
    <form action={submitAction} className="space-y-5">
      <RadioGroup
        name="visibility"
        label="Visibility"
        defaultValue={initialData?.visibility ?? "public"}
        orientation="horizontal"
      >
        <Radio name="visibility" value="public">
          Public
        </Radio>
        <Radio name="visibility" value="private" defaultChecked>
          Private
        </Radio>
      </RadioGroup>
      <Input
        isRequired
        name="title"
        label="Title"
        defaultValue={initialData?.title ?? undefined}
      />
      <Input
        name="description"
        label="Description"
        defaultValue={initialData?.description ?? undefined}
      />
      <Input
        name="link"
        label="Link"
        defaultValue={initialData?.link ?? undefined}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 ">
        <Autocomplete
          name="useCase"
          label="Use Case"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={initialData?.use_case?.id.toString() ?? undefined}
        >
          {fieldOptions.useCases?.map((useCase) => (
            <AutocompleteItem key={useCase.id} value={useCase.id}>
              {useCase.title}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="language"
          label="Language"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={initialData?.language?.id.toString() ?? undefined}
        >
          {fieldOptions.languages?.map((language) => (
            <AutocompleteItem key={language.id} textValue={language.title}>
              <div className="flex items-center gap-2">
                <Avatar
                  alt={language.title}
                  size="sm"
                  src={language.icon ?? ""}
                  classNames={{
                    img: language.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{language.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="framework"
          label="Framework"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={
            initialData?.framework?.id.toString() ?? undefined
          }
        >
          {fieldOptions.frameworks?.map((framework) => (
            <AutocompleteItem key={framework.id} textValue={framework.title}>
              <div className="flex items-center gap-2">
                <Avatar
                  alt={framework.title}
                  size="sm"
                  src={framework.icon ?? ""}
                  classNames={{
                    img: framework.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{framework.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="metaFramework"
          label="Meta Framework"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={
            initialData?.meta_framework?.id.toString() ?? undefined
          }
        >
          {fieldOptions.metaFrameworks?.map((metaFramework) => (
            <AutocompleteItem
              key={metaFramework.id}
              textValue={metaFramework.title}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  alt={metaFramework.title}
                  size="sm"
                  src={metaFramework.icon ?? ""}
                  classNames={{
                    img: metaFramework.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{metaFramework.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="styling"
          label="Styling"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={initialData?.styling?.id.toString() ?? undefined}
        >
          {fieldOptions.stylings?.map((styling) => (
            <AutocompleteItem key={styling.id} textValue={styling.title}>
              <div className="flex items-center gap-2">
                <Avatar
                  alt={styling.title}
                  size="sm"
                  src={styling.icon ?? ""}
                  classNames={{
                    img: styling.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{styling.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="uiLibrary"
          label="UI Library"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={
            initialData?.ui_library?.id.toString() ?? undefined
          }
        >
          {fieldOptions.uiLibraries?.map((uiLibrary) => (
            <AutocompleteItem key={uiLibrary.id} textValue={uiLibrary.title}>
              <div className="flex items-center gap-2">
                <Avatar
                  alt={uiLibrary.title}
                  size="sm"
                  src={uiLibrary.icon ?? ""}
                  classNames={{
                    img: uiLibrary.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{uiLibrary.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="database"
          label="Database"
          variant="bordered"
          labelPlacement="inside"
          defaultSelectedKey={initialData?.database?.id.toString() ?? undefined}
        >
          {fieldOptions.databases?.map((database) => (
            <AutocompleteItem key={database.id} textValue={database.title}>
              <div className="flex items-center gap-2">
                <Avatar
                  alt={database.title}
                  size="sm"
                  src={database.icon ?? ""}
                  classNames={{
                    img: database.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{database.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          name="backendFramework"
          label="Backend Framework"
          variant="bordered"
          defaultSelectedKey={
            initialData?.backend_framework?.id.toString() ?? undefined
          }
        >
          {fieldOptions.backendFrameworks?.map((backendFramework) => (
            <AutocompleteItem
              key={backendFramework.id}
              textValue={backendFramework.title}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  alt={backendFramework.title}
                  size="sm"
                  src={backendFramework.icon ?? ""}
                  classNames={{
                    img: backendFramework.has_dark_icon ? "dark:invert" : "",
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-small">{backendFramework.title}</span>
                </div>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <Select
        name="otherLibraries"
        label="Other Libraries"
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        classNames={{
          label: "overflow-visible",
        }}
        defaultSelectedKeys={initialData?.other_libraries?.map((library) => {
          return library.id.toString()
        })}
        // sorts items by category
        items={fieldOptions.otherLibraries.sort((a, b) => {
          if (
            a?.other_library_category === null &&
            b?.other_library_category === null
          ) {
            return 0
          } else if (a?.other_library_category === null) {
            return 1
          } else if (b?.other_library_category === null) {
            return -1
          }

          return a?.other_library_category.title.localeCompare(
            b.other_library_category.title
          )
        })}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-1">
              {items.map((item) => (
                <Chip key={item.key} variant="bordered">
                  {item.data?.title}
                </Chip>
              ))}
            </div>
          )
        }}
      >
        {(library) => (
          <SelectItem key={library.id} textValue={library.title}>
            <div className="flex items-center gap-2">
              <Avatar
                alt={library.title}
                className="shrink-0"
                size="sm"
                src={library.icon ?? ""}
                classNames={{
                  img: library.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 items-center justify-between">
                <span>{library.title}</span>
                {library.other_library_category?.title ? (
                  <Chip variant="faded" size="sm">
                    {library.other_library_category.title}
                  </Chip>
                ) : null}
              </div>
            </div>
          </SelectItem>
        )}
      </Select>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      className="w-full md:w-fit"
      variant="faded"
      color="primary"
    >
      Submit
    </Button>
  )
}
