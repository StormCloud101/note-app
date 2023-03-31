import { FormEvent, useRef, useState } from "react";
import { Stack, Form, Row, Col, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App";
import {v4 as uuidV4} from "uuid"


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[] 
} & Partial<NoteData>

export function NoteForm({onSubmit, onAddTag, availableTags, title ="", markdown = "", tags=[],}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const Navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,

        })

        Navigate("..")


    }
 
   return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <FormGroup controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} required defaultValue={title} />

                </FormGroup>
                </Col>
                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect

                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label }
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                    }}
                    value={selectedTags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })}
                    options={availableTags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })}

                    onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value}
                        }))
                    }}
                    isMulti />

                </Form.Group>
                </Col>
            </Row>
            
            <FormGroup controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control defaultValue={markdown} required as="textarea" ref={markdownRef} rows={15} />

                </FormGroup>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <button type="submit" className="btn btn-primary">Save</button>
                    
                    <Link to="..">
                    <button type="button" className="btn btn-outline-secondary">Cancel</button>
                    </Link>


                </Stack>
            


        </Stack>
    </Form>
   )
   

}