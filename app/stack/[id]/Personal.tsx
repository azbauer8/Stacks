import Link from "next/link"
import { FormattedStack } from "@/utils/querySupabase"

import { badgeVariants } from "@/components/ui/badge"

import StackItem from "./StackListItem"

export default async function PersonalStack({
  stack,
}: {
  stack: FormattedStack
}) {
  return (
    <div className="mx-auto mt-6 space-y-8 px-0.5">
      <div>
        <h2 className="text-4xl font-bold">{stack.title}</h2>
        <div className="flex items-center justify-between space-y-1.5 text-sm">
          <Link
            href={`/${stack.user?.user_name}`}
            className={`${badgeVariants({
              variant: "default",
            })} w-fit items-center text-[13px]`}
            shallow={true}
          >
            <h2>{stack.user?.user_name}</h2>
          </Link>
          <div className="text-right text-muted-foreground">
            Updated{" "}
            <span className="font-medium">
              {new Date(stack.updated_at).toDateString()}
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm ">{stack.description}</p>
      </div>
      <div className="mt-8 space-y-3">
        {stack.language && (
          <StackItem
            header="Language"
            iconPath={stack.language.icon_path}
            icon={stack.language.icon}
            hasDarkIcon={stack.language.has_dark_icon}
            title={stack.language.title}
            description={stack.language.description}
            link={stack.language.link}
          />
        )}
        {stack.framework && (
          <StackItem
            header="Frontend"
            iconPath={stack.framework.icon_path}
            icon={stack.framework.icon}
            hasDarkIcon={stack.framework.has_dark_icon}
            title={stack.framework.title}
            description={stack.framework.description}
            link={stack.framework.link}
          />
        )}
        {stack.meta_framework && (
          <StackItem
            header="Meta Framework"
            iconPath={stack.meta_framework.icon_path}
            icon={stack.meta_framework.icon}
            hasDarkIcon={stack.meta_framework.has_dark_icon}
            title={stack.meta_framework.title}
            description={stack.meta_framework.description}
            link={stack.meta_framework.link}
          />
        )}
        {stack.styling && (
          <StackItem
            header="Styling"
            iconPath={stack.styling.icon_path}
            icon={stack.styling.icon}
            hasDarkIcon={stack.styling.has_dark_icon}
            title={stack.styling.title}
            description={stack.styling.description}
            link={stack.styling.link}
          />
        )}
        {stack.ui_library && (
          <StackItem
            header="UI Library"
            iconPath={stack.ui_library.icon_path}
            icon={stack.ui_library.icon}
            hasDarkIcon={stack.ui_library.has_dark_icon}
            title={stack.ui_library.title}
            description={stack.ui_library.description}
            link={stack.ui_library.link}
          />
        )}
        {stack.database && (
          <StackItem
            header="Database"
            iconPath={stack.database.icon_path}
            icon={stack.database.icon}
            hasDarkIcon={stack.database.has_dark_icon}
            title={stack.database.title}
            description={stack.database.description}
            link={stack.database.link}
          />
        )}
        {stack.backend_framework && (
          <StackItem
            header="Backend"
            iconPath={stack.backend_framework.icon_path}
            icon={stack.backend_framework.icon}
            hasDarkIcon={stack.backend_framework.has_dark_icon}
            title={stack.backend_framework.title}
            description={stack.backend_framework.description}
            link={stack.backend_framework.link}
          />
        )}
        {stack.other_libraries &&
          stack.other_libraries.map((library) => (
            <StackItem
              key={library.id}
              header={
                library.other_library_category?.title
                  ? library.other_library_category.title
                  : "Misc. Library"
              }
              iconPath={library.icon_path}
              icon={library.icon}
              hasDarkIcon={library.has_dark_icon}
              title={library.title}
              description={library.description}
              link={library.link}
            />
          ))}
      </div>
    </div>
  )
}
