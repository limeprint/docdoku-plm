/*
 * DocDoku, Professional Open Source
 * Copyright 2006, 2007, 2008, 2009, 2010, 2011, 2012 DocDoku SARL
 *
 * This file is part of DocDoku.
 *
 * DocDoku is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DocDoku is distributed in the hope that it will be useful,  
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
 * GNU General Public License for more details.  
 *  
 * You should have received a copy of the GNU General Public License  
 * along with DocDoku.  If not, see <http://www.gnu.org/licenses/>.  
 */

package com.docdoku.server.rest.dto;

import java.io.Serializable;

/**
 *
 * @author Yassine Belouad
 */
public class DocumentCreationDTO implements Serializable, Comparable<DocumentCreationDTO> {

    private String workspaceId;
    private String id;
    private String reference;
    private String version;
    private String type;
    private String title;
    private String description;
    private WorkflowModelDTO workflowModel;
    private DocumentMasterTemplateDTO documentMsTemplate;
    private String path;

    public DocumentCreationDTO() {
    }

    public String getDescription() {
        return description;
    }

    public String getId() {
        return id;
    }

    public String getWorkspaceId() {
        return workspaceId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }

    public String getTitle() {
        return title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWorkspaceID(String workspaceID) {
        this.workspaceId = workspaceID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
        
    public DocumentMasterTemplateDTO getDocumentMsTemplate() {
        return documentMsTemplate;
    }

    public void setDocumentMsTemplate(DocumentMasterTemplateDTO documentMsTemplate) {
        this.documentMsTemplate = documentMsTemplate;
    }

    public WorkflowModelDTO getWorkflowModel() {
        return workflowModel;
    }

    public void setWorkflowModel(WorkflowModelDTO workflowModel) {
        this.workflowModel = workflowModel;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return workspaceId + "-" + id + "-" + version;
    }

    @Override
    public boolean equals(Object pObj) {
        if (this == pObj) {
            return true;
        }
        if (!(pObj instanceof DocumentCreationDTO)) {
            return false;
        }
        DocumentCreationDTO docM = (DocumentCreationDTO) pObj;
        return ((docM.id.equals(id)) && (docM.workspaceId.equals(workspaceId)) && (docM.version.equals(version)));

    }

    @Override
    public int hashCode() {
        int hash = 1;
        hash = 31 * hash + workspaceId.hashCode();
        hash = 31 * hash + id.hashCode();
        hash = 31 * hash + version.hashCode();
        return hash;
    }

    public int compareTo(DocumentCreationDTO pDocM) {
        int wksComp = workspaceId.compareTo(pDocM.workspaceId);
        if (wksComp != 0) {
            return wksComp;
        }
        int idComp = id.compareTo(pDocM.id);
        if (idComp != 0) {
            return idComp;
        } else {
            return version.compareTo(pDocM.version);
        }
    }
}
