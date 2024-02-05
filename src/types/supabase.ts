export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      backend_frameworks: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      databases: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      frameworks: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      meta_frameworks: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      other_libraries: {
        Row: {
          category: number | null
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          category?: number | null
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          category?: number | null
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "other_libraries_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "other_library_category"
            referencedColumns: ["id"]
          },
        ]
      }
      other_library_category: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: number
          title: string
        }
        Update: {
          id?: number
          title?: string
        }
        Relationships: []
      }
      stack_other_libraries: {
        Row: {
          other_library_id: number
          stack_id: number
        }
        Insert: {
          other_library_id: number
          stack_id: number
        }
        Update: {
          other_library_id?: number
          stack_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "stack_other_libraries_other_library_id_fkey"
            columns: ["other_library_id"]
            isOneToOne: false
            referencedRelation: "other_libraries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stack_other_libraries_stack_id_fkey"
            columns: ["stack_id"]
            isOneToOne: false
            referencedRelation: "stacks"
            referencedColumns: ["id"]
          },
        ]
      }
      stacks: {
        Row: {
          backend_framework: number | null
          created_at: string
          database: number | null
          description: string | null
          framework: number | null
          id: number
          language: number | null
          link: string | null
          meta_framework: number | null
          styling: number | null
          title: string
          ui_library: number | null
          updated_at: string
          use_case: number | null
          user: string
          visibility: Database["public"]["Enums"]["visibility_enum"]
        }
        Insert: {
          backend_framework?: number | null
          created_at?: string
          database?: number | null
          description?: string | null
          framework?: number | null
          id?: number
          language?: number | null
          link?: string | null
          meta_framework?: number | null
          styling?: number | null
          title: string
          ui_library?: number | null
          updated_at?: string
          use_case?: number | null
          user: string
          visibility: Database["public"]["Enums"]["visibility_enum"]
        }
        Update: {
          backend_framework?: number | null
          created_at?: string
          database?: number | null
          description?: string | null
          framework?: number | null
          id?: number
          language?: number | null
          link?: string | null
          meta_framework?: number | null
          styling?: number | null
          title?: string
          ui_library?: number | null
          updated_at?: string
          use_case?: number | null
          user?: string
          visibility?: Database["public"]["Enums"]["visibility_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "stacks_backend_framework_fkey"
            columns: ["backend_framework"]
            isOneToOne: false
            referencedRelation: "backend_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_database_fkey"
            columns: ["database"]
            isOneToOne: false
            referencedRelation: "databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_framework_fkey"
            columns: ["framework"]
            isOneToOne: false
            referencedRelation: "frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_language_fkey"
            columns: ["language"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_meta_framework_fkey"
            columns: ["meta_framework"]
            isOneToOne: false
            referencedRelation: "meta_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_styling_fkey"
            columns: ["styling"]
            isOneToOne: false
            referencedRelation: "stylings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_ui_library_fkey"
            columns: ["ui_library"]
            isOneToOne: false
            referencedRelation: "ui_libraries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_use_case_fkey"
            columns: ["use_case"]
            isOneToOne: false
            referencedRelation: "use_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stacks_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stylings: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      ui_libraries: {
        Row: {
          description: string | null
          has_dark_icon: boolean
          icon: string | null
          id: number
          link: string | null
          title: string
        }
        Insert: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title: string
        }
        Update: {
          description?: string | null
          has_dark_icon?: boolean
          icon?: string | null
          id?: number
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      use_cases: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: number
          title: string
        }
        Update: {
          id?: number
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          user_name: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id: string
          name: string
          user_name: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      visibility_enum: "public" | "private"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
