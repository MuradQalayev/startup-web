/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { visionTool } from '@sanity/vision'
import { defineCliConfig } from 'sanity/cli'
import { structureTool } from 'sanity/structure'
import { apiVersion } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
    basePath:'/studio',
    dataset,
    schema,
    plugins:[
        structureTool({structure}),
        visionTool({defaultApiVersion:apiVersion})
    ]
 })
