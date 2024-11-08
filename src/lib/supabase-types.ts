export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dog_additional_owners: {
        Row: {
          additional_owner_id: string
          dog_id: string
        }
        Insert: {
          additional_owner_id: string
          dog_id: string
        }
        Update: {
          additional_owner_id?: string
          dog_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dog_additional_owners_additional_owner_id_fkey'
            columns: ['additional_owner_id']
            isOneToOne: false
            referencedRelation: 'dog_with_owners'
            referencedColumns: ['primary_owner_id']
          },
          {
            foreignKeyName: 'dog_additional_owners_additional_owner_id_fkey'
            columns: ['additional_owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dog_additional_owners_dog_id_fkey'
            columns: ['dog_id']
            isOneToOne: false
            referencedRelation: 'dog_with_owners'
            referencedColumns: ['dog_id']
          },
          {
            foreignKeyName: 'dog_additional_owners_dog_id_fkey'
            columns: ['dog_id']
            isOneToOne: false
            referencedRelation: 'dogs'
            referencedColumns: ['id']
          },
        ]
      }
      dogs: {
        Row: {
          breed: string | null
          created_at: string | null
          dob: string | null
          id: string
          image_url: string | null
          name: string
          owner_id: string | null
        }
        Insert: {
          breed?: string | null
          created_at?: string | null
          dob?: string | null
          id?: string
          image_url?: string | null
          name: string
          owner_id?: string | null
        }
        Update: {
          breed?: string | null
          created_at?: string | null
          dob?: string | null
          id?: string
          image_url?: string | null
          name?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'dogs_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'dog_with_owners'
            referencedColumns: ['primary_owner_id']
          },
          {
            foreignKeyName: 'dogs_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      onboarding_process_complete: {
        Row: {
          auth_id: string
          is_completed: boolean
        }
        Insert: {
          auth_id: string
          is_completed?: boolean
        }
        Update: {
          auth_id?: string
          is_completed?: boolean
        }
        Relationships: []
      }
      registration_requests: {
        Row: {
          content_text: string | null
          email: string
          id: string
          name: string
          requested_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database['public']['Enums']['request_status']
        }
        Insert: {
          content_text?: string | null
          email: string
          id?: string
          name: string
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database['public']['Enums']['request_status']
        }
        Update: {
          content_text?: string | null
          email?: string
          id?: string
          name?: string
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database['public']['Enums']['request_status']
        }
        Relationships: [
          {
            foreignKeyName: 'registration_requests_reviewed_by_fkey'
            columns: ['reviewed_by']
            isOneToOne: false
            referencedRelation: 'dog_with_owners'
            referencedColumns: ['primary_owner_id']
          },
          {
            foreignKeyName: 'registration_requests_reviewed_by_fkey'
            columns: ['reviewed_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string | null
          email: string
          id: string
          is_admin: boolean | null
          name: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_admin?: boolean | null
          name: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_admin?: boolean | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      dog_with_owners: {
        Row: {
          additional_owners: Json | null
          breed: string | null
          created_at: string | null
          dob: string | null
          dog_id: string | null
          dog_name: string | null
          image_url: string | null
          primary_owner_email: string | null
          primary_owner_id: string | null
          primary_owner_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      request_status: 'pending' | 'approved' | 'refused'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
