import supabase from "../utils/supabase";
import { File } from "../types";

export async function getFiles({userId = null} : {userId: string | null}) {
    const { data, error } = await supabase.from("files").select("*").eq("userId", userId);
    if (error){
        throw error;
    }
    return data;
}

export async function getFile({id} : {id: string}) {
    const { data, error } = await supabase.from("files").select("*").eq("id", id);
    if (error) {
        throw error;
    }
    return data[0];
}

export async function createFile({file} : {file: File}) {
    const { data, error } = await supabase.from("files").insert({
        title: file.title,
        uri: file.uri,
        userId: file.userId,
    }).select();
    if (error) {
        throw error;
    }
    return data[0];
}

export async function updateFile({id, title} : {id: string, title: string}) {
    const { data, error } = await supabase.from("files").update({
        title,
    }).eq("id", id).select();
    if (error) {
        throw error;
    }
    return data[0];
}

export async function deleteFile({id} : {id: string}) {
    const { data, error } = await supabase.from("files").delete().eq("id", id).select();
    if (error) {
        throw error;
    }
    return data[0];
}   

