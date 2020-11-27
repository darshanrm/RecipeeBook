import React, { useRef, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import './FormikForm.css';


const ADD_RECIPEE = gql`
  mutation AddRecipee($author: String!, $recipee: String!, $description: String!, $ingredients: [String]!, $tags: [String]!, $procedure: String!,$photo: Upload!, $profile: Upload! ){
    addRecipee(recipee:{author: $author, recipee: $recipee, description: $description, ingredients: $ingredients, tags: $tags, procedure: $procedure, photo: $photo, profile: $profile}){
      id
      recipee
      author
    }
  }
  `;


const FormikForm = () => {
      const pic = useRef();
      const profilePic = useRef();
      const [recipeePhoto, setRecipeePhoto] = useState("");
      const [profilePhoto, setProfilePhoto] = useState("");
      const [addRecipee, { data }] = useMutation(ADD_RECIPEE);
      
      const onFileChange = () => {
        if(pic.current.files[0]){
          const reader = new FileReader();

          reader.readAsDataURL(pic.current.files[0]);
          reader.onload = (e) => setRecipeePhoto(e.target.result);
        }
      };
      const onProfileChange = () => {
        if(profilePic.current.files[0]){
          const reader = new FileReader();

          reader.readAsDataURL(profilePic.current.files[0]);
          reader.onload = (e) => setProfilePhoto(e.target.result);
        }
      };
      return ( 
              <Formik
                initialValues={{ingredients: [], tags: [], author: '', recipee: '', description: '', procedure:'' }}
                validationSchema={Yup.object({
                  ingredients: Yup.array()
                    .of(Yup.string()).min(1, 'Must provide 1 ingredient'),
                  tags: Yup.array()
                    .of(Yup.string())
                    .min(1, 'Must provide 1 tag'),
                  author: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                  recipee: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  description: Yup.string()
                    .max(40, 'Must be 40 characters or less')
                    .required('Required'),
                  procedure: Yup.string()
                    .max(250, 'Must be 250 characters or less')
                    .required('Required'),  
                })
              }

              onSubmit={(values, actions) => {
                console.log(recipeePhoto);
                addRecipee( { variables: {author:values.author, recipee: values.recipee, description: values.description, ingredients: values.ingredients, tags: values.tags, procedure: values.procedure, photo: recipeePhoto, profile: profilePhoto} })    
              }}
              
              render = {({ values }) =>(     
                <Form>
                  <div>
                    <h2>SUBMIT YOUR RECIPEE</h2>
                  </div>

                  <div>
                    <Field name="author" as={TextField} label="Author Name" type="text" fullWidth autoComplete="off"/>
                    <ErrorMessage name="author" />
                  </div>
                  
                  <div>
                    <Field name="recipee" as={TextField} label="Recipee Name" type="text" fullWidth autoComplete="off"/>
                    <ErrorMessage name="recipee" />
                  </div>
                  
                  <div>
                    <Field name="description" as={TextField} label="Describe recipee in few words" type="text" fullWidth autoComplete="off"/>
                    <ErrorMessage name="description" />
                  </div>
                  
                  <div>
                    <Field name="procedure" as={TextField} label="How to prepare" type="text" multiline rowsMax={4} fullWidth autoComplete="off"/>
                    <ErrorMessage name="procedure" />
                  </div>
                  <br/>
                  
                  <div>
                    <Typography><h3>Ingredients</h3></Typography>
                    <FieldArray
                      name="ingredients"
                      render={arrayHelpers => (
                        <div>
                          {values.ingredients && values.ingredients.length > 0 ? (
                            values.ingredients.map((friend, index) => (
                              <div key={index}>
                                <Field name={`ingredients.${index}`} label="Add ingredient" as={TextField} />
                                <button
                                  as={Button}
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  as={Button}
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, '')}
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ):(
                              <button 
                                as={Button}
                                type="button"
                                onClick={() => arrayHelpers.push('')}>
                                Add more ingredients..
                              </button>
                            )}
                        </div>    
                      )}
                    />
                  </div>
                  <br/>
                  
                  <div>
                    <Typography><h3>Tags</h3></Typography>
                    <FieldArray
                      name="tags"
                      render={arrayHelpers => (
                        <div>
                          {values.tags && values.tags.length > 0 ? (
                            values.tags.map((friend, index) => (
                              <div key={index}>
                                <Field name={`tags.${index}`} label="Hints to find your recipee" as={TextField}/>
                                <button
                                  as={Button}
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  as={Button}
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, '')}
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                                <button as={Button} type="button" onClick={() => arrayHelpers.push('')}>
                                  Add tags for your recipee...
                                </button>
                              )}
                        </div>
                      )}
                    />
                  </div>
                  <br/>
                  
                  <div>
                    <label>Recipee Photo</label>
                    <input type="file" ref={pic} onChange={onFileChange}></input>
                  </div>
                  
                  <div>
                    <label>Profile Photo</label>
                    <input type="file" ref={profilePic} onChange={onProfileChange}></input>
                  </div> 
                  
                  <br/>
                  <div>
                    <button className="submitBtn" type="submit">Submit</button>
                  </div>
                </Form>                  
              )}
            />
      )
    }
 
export default FormikForm;