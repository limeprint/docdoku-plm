/*
 * DocDoku, Professional Open Source
 * Copyright 2006 - 2014 DocDoku SARL
 *
 * This file is part of DocDokuPLM.
 *
 * DocDokuPLM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DocDokuPLM is distributed in the hope that it will be useful,  
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
 * GNU Affero General Public License for more details.  
 *  
 * You should have received a copy of the GNU Affero General Public License  
 * along with DocDokuPLM.  If not, see <http://www.gnu.org/licenses/>.  
 */

package com.docdoku.core.meta;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Defines a text type custom attribute of a document.
 * 
 * @author Florent Garin
 * @version 1.0, 02/06/08
 * @since   V1.0
 */
@Table(name="INSTANCETEXTATTRIBUTE")
@Entity
public class InstanceTextAttribute extends InstanceAttribute{

    

    private String textValue;
    
    public InstanceTextAttribute() {
    }
    
    public InstanceTextAttribute(String pName, String pValue, boolean pMandatory) {
        super(pName, pMandatory);
        setTextValue(pValue);
    }

    @Override
    public String getValue() {return textValue;}
    @Override
    public boolean setValue(Object pValue) {
        textValue=pValue + "";
        return true;
    }

    public String getTextValue() {return textValue;}
    public void setTextValue(String textValue) {this.textValue = textValue;}
}
