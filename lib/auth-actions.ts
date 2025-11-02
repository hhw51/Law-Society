"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function adminSignUp(email: string, password: string) {
  const supabase = await getSupabaseServer()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  // Create user profile with admin role
  if (authData.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email,
      role: "admin",
      created_at: new Date().toISOString(),
    })

    if (profileError) {
      return { error: profileError.message }
    }
  }

  return { success: true }
}

export async function adminSignIn(email: string, password: string) {
  const supabase = await getSupabaseServer()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, user: data.user }
}

export async function adminSignOut() {
  const supabase = await getSupabaseServer()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

export async function getAdminUser() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  const { data: userData, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (profileError || !userData || userData.role !== "admin") {
    return null
  }

  return userData
}
