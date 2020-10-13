import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmailEditorComponent } from 'angular-email-editor';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.css'],
})
export class MailTemplatesComponent implements OnInit {
  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent;
  adminData=null
  content=null
  mailTemplates=[]
  type=""
  success=false
  constructor(private _admin:AdminService,private _router:Router,private _sanitizer:DomSanitizer) {
   }
  ngOnInit(): void {
    this.adminData=this._admin.adminData()
    this._admin.getEmails(this.adminData.admin_id).subscribe(data=>this.mailTemplates=data,err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
  }

  loadDesign(){
      this.emailEditor.editor.loadDesign({"counters":{"u_column":7,"u_row":4,"u_content_image":1,"u_content_text":3,"u_content_divider":3,"u_content_html":2},"body":{"rows":[{"cells":[1,1,1,1],"columns":[{"contents":[],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_2","htmlClassNames":"u_column"}}},{"contents":[{"type":"image","values":{"containerPadding":"11px 10px 10px 18px","_meta":{"htmlID":"u_content_image_1","htmlClassNames":"u_content_image"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"src":{"url":"https://unroll-images-production.s3.amazonaws.com/projects/0/1601691385415-HomeLogo.png","width":860,"height":857,"autoWidth":false,"maxWidth":"56%"},"textAlign":"right","altText":"Image","action":{"name":"web","values":{"href":"","target":"_blank"}},"hideDesktop":false,"hideMobile":false,"_override":{"mobile":{"src":{"autoWidth":true,"maxWidth":"100%"}}}}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_3","htmlClassNames":"u_column"}}},{"contents":[{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_1","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"color":"#000000","textAlign":"left","lineHeight":"230%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"hideDesktop":false,"hideMobile":false,"text":"<p style=\"font-size: 14px; line-height: 230%; text-align: center;\"><span style=\"font-size: 24px; line-height: 55.2px; font-family: 'comic sans ms', sans-serif;\"><strong>Flipzon</strong></span></p>"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_4","htmlClassNames":"u_column"}}},{"contents":[],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_5","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideDesktop":false,"hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_2","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"_override":{"mobile":{"noStackMobile":false,"hideMobile":false}}}},{"cells":[1],"columns":[{"contents":[{"type":"divider","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_divider_1","htmlClassNames":"u_content_divider"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"width":"100%","border":{"borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#BBBBBB"},"textAlign":"center","hideDesktop":false,"hideMobile":false}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideDesktop":false,"hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true}},{"cells":[1],"columns":[{"contents":[{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_2","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"color":"#000000","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"hideDesktop":false,"hideMobile":false,"text":"<p style=\"font-size: 14px; line-height: 140%; text-align: center;\"><em><span style=\"font-size: 14px; line-height: 19.6px;\">You Can Add Your Body Template here...</span></em></p>"}},{"type":"divider","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_divider_3","htmlClassNames":"u_content_divider"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"width":"100%","border":{"borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#BBBBBB"},"textAlign":"center","hideDesktop":false,"hideMobile":false}},{"type":"text","values":{"containerPadding":"10px","_meta":{"htmlID":"u_content_text_3","htmlClassNames":"u_content_text"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"color":"#000000","textAlign":"left","lineHeight":"140%","linkStyle":{"inherit":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"hideDesktop":false,"hideMobile":false,"text":"<p style=\"text-align: center; font-size: 14px; line-height: 140%;\"><span style=\"font-size: 14px; line-height: 19.6px;\">Ⓒ Flipzon &amp; Team</span></p>"}}],"values":{"backgroundColor":"","padding":"0px","border":{},"_meta":{"htmlID":"u_column_7","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"padding":"0px","hideDesktop":false,"hideMobile":false,"noStackMobile":false,"_meta":{"htmlID":"u_row_4","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true}}],"values":{"backgroundColor":"#ffffff","backgroundImage":{"url":"","fullWidth":true,"repeat":false,"center":true,"cover":false},"contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"linkStyle":{"body":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}},"schemaVersion":5})
  }

  editorLoaded(design,type) {
    // load the design json here
    this.emailEditor.editor.loadDesign(JSON.parse(design));
    this.type=type
  }

   async saveHtml() {
     await this.emailEditor.editor.exportHtml((data) =>{
        let design=JSON.stringify(data.design)
        let template=JSON.stringify(this._sanitizer.bypassSecurityTrustHtml(data.html))
        if(design!=null && template!=null){
          console.log(design,template)
          if(design.length>0&&template.length>0 && this.type.length>0){
            this._admin.saveTemplate(design,template,this.type,this.adminData.admin_id).subscribe(data=>{
              this.clickLoad()
           },err=>{
            sessionStorage.removeItem("Admin")
            this._router.navigate(['/notFound',err.statusText])
          })
         }
         else{
           this.success=false
         }
        } 
    });
      
  }
  clickLoad(){
    document.getElementById("load").click()
  }
  loadTemplates(){
    this.success=true
    this.type=""
    this._admin.getEmails(this.adminData.admin_id).subscribe(data=>this.mailTemplates=data,err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
  }

  deleteTemplate(tid){
    if (!confirm('Are you sure?')) return false;
    this._admin.deleteTemplate(tid,this.adminData.admin_id).subscribe(data=>{
      this._admin.getEmails(this.adminData.admin_id).subscribe(data=>this.mailTemplates=data,err=>{
        sessionStorage.removeItem("Admin")
        this._router.navigate(['/notFound',err.statusText])
      })
    },err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
  }

}
