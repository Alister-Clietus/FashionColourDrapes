package com.fashionapp.fashionService.repository.specifications;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.fashionapp.fashionService.entity.ClientEntity;



public class SecurityUserSpec {
	public static Specification<ClientEntity> getUserSpec(String searchParam) {
		return new Specification<ClientEntity>() {
			public Predicate toPredicate(Root<ClientEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				Predicate finalPredicate = null;
				JSONParser parser = new JSONParser();
				JSONObject searchObject;
				try {
					searchObject = (JSONObject) parser.parse(searchParam);
					String name = (String) searchObject.get("clientName");
					String email = (String) searchObject.get("clientEmail");
					String phonenumber = (String) searchObject.get("clientPhoneNumber");
					String address = (String) searchObject.get("clientAddress");
					String gender = (String) searchObject.get("clientGender");
					
		            
		            if(!StringUtils.isEmpty(email)) 
		            {
		            	
		            	Predicate emailPredicate = criteriaBuilder.like(criteriaBuilder.upper(root.get("clientEmail")),"%"+email.toUpperCase()+"%");
		            	if(finalPredicate!=null) 
		            	{
		            		emailPredicate = criteriaBuilder.and(finalPredicate, emailPredicate);
		            	}else {
		            		finalPredicate = criteriaBuilder.and(emailPredicate);
		            	}
		            	
		            }
		            
		            
		            if(!StringUtils.isEmpty(phonenumber)) 
		            {
		            	
		            	Predicate phonenumberPredicate = criteriaBuilder.like(criteriaBuilder.upper(root.get("clientPhoneNumber")), "%"+phonenumber.toUpperCase()+"%");
		            	if(finalPredicate!=null) {
		            		finalPredicate = criteriaBuilder.and(finalPredicate, phonenumberPredicate);
		            	}else {
		            		finalPredicate = criteriaBuilder.and(phonenumberPredicate);
		            	}
		            }
		            
		            if(!StringUtils.isEmpty(address)) 
		            {
		            	
		            	Predicate dobPredicate = criteriaBuilder.like(criteriaBuilder.upper(root.get("clientAddress")), "%"+address.toUpperCase()+"%");
		            	if(finalPredicate!=null) {
		            		finalPredicate = criteriaBuilder.and(finalPredicate, dobPredicate);
		            	}else {
		            		finalPredicate = criteriaBuilder.and(dobPredicate);
		            	}
		            }
		            
		            if(!StringUtils.isEmpty(gender)) 
		            {
		          
		            	Predicate statusPredicate = criteriaBuilder.like(criteriaBuilder.upper(root.get("gender")), "%"+gender.toUpperCase()+"%");
		            	if(finalPredicate!=null) {
		            		finalPredicate = criteriaBuilder.and(finalPredicate, statusPredicate);
		            	}else {
		            		finalPredicate = criteriaBuilder.and(statusPredicate);
		            	}
		            }
		            if(!StringUtils.isEmpty(name)) 
		            {
		          
		            	Predicate bloodPredicate = criteriaBuilder.like(criteriaBuilder.upper(root.get("clientName")), "%"+name.toUpperCase()+"%");
		            	if(finalPredicate!=null) {
		            		finalPredicate = criteriaBuilder.and(finalPredicate, bloodPredicate);
		            	}else {
		            		finalPredicate = criteriaBuilder.and(bloodPredicate);
		            	}
		            }
		            
		            Order proTimeOrder = criteriaBuilder.desc(root.get("clientName"));
		            query.orderBy(proTimeOrder);
		            
				} catch (ParseException e) 
				{
					e.printStackTrace();
				}
	            
				return finalPredicate;
			}
		};
	}
}
