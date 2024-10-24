import supabase from "../utils/supabase";
import { RequestBody } from "../types";

export async function getContents({
    userId = null,
    type = null,
}: {
    userId?: string | null;
    type?: string | null;
}) {
    let query = supabase.from("contents").select("*");

    if (userId) {
        query = query.eq("userId", userId);
    }
    if (type) {
        query = query.eq("type", type);
    }

    const { data, error } = await query;
    if (error) {
        throw error;
    }
    return data;
}
export async function getContent({ id }: { id: string }) {
    const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("id", id);
    if (error) {
        throw error;
    }
    return data[0];
}
export async function createContent({ content }: { content: RequestBody }) {
    const { data, error } = await supabase
        .from("contents")
        .insert({
            title: content.title,
            type: content.type,
            file_id: content.fileId,
            difficulty: content.difficulty,
            number_of_items: content.numberOfItems,
            content: content.content,
            out_of_scope: content.outOfScope,
        })
        .select();
    if (error) {
        throw error;
    }
    return data[0];
}
export async function updateContent({
    id,
    title,
}: {
    id: string;
    title: string;
}) {
    const { data, error } = await supabase
        .from("contents")
        .update({
            title,
        })
        .eq("id", id)
        .select();
    if (error) {
        throw error;
    }
    return data[0];
}
export async function deleteContent({ id }: { id: string }) {
    const { data, error } = await supabase
        .from("contents")
        .delete()
        .eq("id", id)
        .select();
    if (error) {
        throw error;
    }
    return data[0];
}
